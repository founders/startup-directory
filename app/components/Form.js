import React from 'react';
import JSONSchemaForm from 'react-jsonschema-form';
import { STAGES, CATEGORIES, SIZES } from '../utils/constants';

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
  founders: {
    'ui:description': 'Add the founders of your organization.',
  },
};
export default function Form({ onSubmit, account }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [schema, setSchema] = React.useState(postSchema);

  React.useEffect(() => {
    (async function () {
      if (!account) return;

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
    <div class="container">
      <div className="col-md-offset-8 col-md-7">
        <JSONSchemaForm
          onSubmit={onSubmit}
          schema={schema}
          uiSchema={uiSchema}
        />
      </div>
    </div>
  );
}
