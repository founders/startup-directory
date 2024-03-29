import router from 'next/router';
import React, { useEffect } from 'react';
import JSONSchemaForm from 'react-jsonschema-form';
import { STAGES, CATEGORIES, SIZES, RESOURCES } from '../utils/constants';

const postSchema = {
  type: 'object',
  properties: {
    avatar: {
      type: 'string',
      format: 'data-url',
      title: 'Startup Avatar (square image)',
    },
    name: {
      title: 'Startup Name',
      type: 'string',
      maxLength: 3,
      maxLength: 60,
    },
    description: {
      type: 'string',
      title: 'Start-Up Description',
      minLength: 20,
      maxLength: 160,
    },
    founded: {
      title: 'Date Founded',
      type: 'string',
      format: 'date',
    },
    categories: {
      title: 'Industry',
      type: 'string',
      enum: CATEGORIES,
      default: CATEGORIES[0],
    },
    resources: {
      title: 'Resources',
      type: 'string',
      enum: RESOURCES,
      default: RESOURCES[0],
    },
    stage: {
      title: 'Stage',
      type: 'string',
      enum: STAGES,
      default: STAGES[0],
    },
    size: {
      title: 'Size',
      type: 'string',
      enum: SIZES,
      default: SIZES[0],
    },
    biography: {
      title: 'Biography',
      type: 'string',
      minLength: 150,
    },
    isHiring: {
      title: 'Are You Hiring?',
      type: 'boolean',
    },
    founders: {
      type: 'array',
      default: [],
      title: 'Organization Founders',
      items: {
        type: 'object',
        required: ['name', 'email', 'title'],
        properties: {
          avatar: {
            type: 'string',
            format: 'data-url',
            title: 'Founder Avatar (square image)',
          },
          name: {
            type: 'string',
            title: 'Founder Name',
          },
          email: {
            type: 'string',
            title: 'Founder Email',
            format: 'email',
          },
          title: {
            type: 'string',
            title: 'Position Name',
          },
          linkedin: {
            type: 'string',
            format: 'url',
            title: 'Linkedin URL',
          },
        },
      },
    },
  },
  required: [
    'name',
    'description',
    'founded',
    'stage',
    'categories',
    'size',
    'biography',
  ],
};

const uiSchema = {
  description: {
    'ui:description':
      'A brief description of your startup between 20 and 160 characters.',
  },
  biography: {
    'ui:widget': 'textarea',
    'ui:description':
      'A long description of your mission, history, and anything else you would like to mention. (min 150 chars)',
  },
  isHiring: {
    'ui:description':
      'Check the box to the right if your organization is looking to recruit.',
  },
  founders: {
    'ui:description': 'Add the founders of your organization.',
  },
};

export default function Form({ onSubmit, account, isOnboarding }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [schema, setSchema] = React.useState(postSchema);
  const [buttonText, setButtonText] = React.useState(
    isOnboarding ? 'Submit' : 'Save Changes',
  );
  const [submitButtonDisabled, setSubmitButtonDisabled] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      if (!account || !account.orgId) return;

      const res = await fetch(`/api/organizations/${account.orgId}`);
      const json = await res.json();

      if (json.data) {
        const newSchema = { ...postSchema };

        const upstreamKeys = Object.keys(json.data);
        const existingKeys = Object.keys(newSchema.properties);

        for (const key of upstreamKeys) {
          if (existingKeys.includes(key)) {
            let upstream = json.data[key];
            if (key === 'categories') {
              upstream = upstream[0];
            }
            if (key === 'resources') {
              upstream = upstream[0];
            }
            newSchema.properties[key].default = upstream;
          }
        }
        newSchema.properties.founded.default = new Date(json.data.founded)
          .toISOString()
          .slice(0, 10);

        setSchema(newSchema);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      console.error('FAILED TO LOAD');
    })();
  }, [account]);

  if (isLoading && account) {
    return null;
  }

  return (
    <div className="container">
      <div className="col-md-offset-8 col-md-7">
        <JSONSchemaForm
          onSubmit={async (e) => {
            const resp = await onSubmit(e);
            if (resp.success) {
              // Make sure user knows their changes went through
              setButtonText('Success!');
              setSubmitButtonDisabled(true);
            } else {
              setButtonText('Error on form submit!');
              setButtonText('Save Changes');
            }
          }}
          schema={schema}
          uiSchema={uiSchema}
        >
          <div
            style={{ display: 'flex', marginTop: '24px', marginBottom: '12px' }}
          >
            <button
              style={{
                margin: '0 12px',
                ...(submitButtonDisabled && {
                  color: 'lightgray',
                  backgroundColor: 'white',
                  border: 'none',
                }),
              }}
              type="submit"
              className={'btn btn-info btn-add'}
              disabled={submitButtonDisabled}
            >
              {buttonText}
            </button>
            <button
              type="button"
              className={'btn btn-info btn-delete'}
              style={{ margin: '0 12px' }}
              onClick={() => {
                if (confirm('Are you sure you want to delete this org?')) {
                  fetch(`/api/organizations/${account.orgId}`, {
                    method: 'DELETE',
                  });
                  router.reload();
                }
              }}
            >
              Delete Org
            </button>
          </div>
        </JSONSchemaForm>
      </div>
    </div>
  );
}
