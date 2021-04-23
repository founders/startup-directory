import React from 'react';
import JSONSchemaForm from 'react-jsonschema-form';

const postSchema = {
  type: 'object',
  properties: {
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
    founders: {
      type: 'array',
      default: [],
      title: 'Organization Founders',
      items: {
        type: 'object',
        required: ['name', 'email', 'title'],
        properties: {
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
  required: ['name', 'description', 'founded'],
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

        const { founders, name, description, founded } = json.data;

        newSchema.properties.founders.default = founders;
        newSchema.properties.name.default = name;
        newSchema.properties.founded.default = new Date(founded)
          .toISOString()
          .slice(0, 10);
        newSchema.properties.description.default = description;

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
