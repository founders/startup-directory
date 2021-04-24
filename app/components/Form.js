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
    },
    description: {
      type: 'string',
      title: 'Start-Up Description',
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
  required: ['name', 'description', 'founded', 'stage', 'categories', 'size'],
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
            newSchema.properties[key].default = json.data[key];
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
        <JSONSchemaForm onSubmit={onSubmit} schema={schema} />
      </div>
    </div>
  );
}
