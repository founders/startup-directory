import React from 'react';
import JSONSchemaForm from "react-jsonschema-form";
import "bootstrap/dist/css/bootstrap.css";

const postSchema = {
    type: "object",
    properties: {
      name: {
        title: "Start-Up Name",
        type: "string"
      },
      email: {
        title: "Start-Up Email",
        type: "string",
        format: "email"
      },
      description: {
        type: "string",
        title: "Start-Up Description"
      },
      founded: {
        title: "Date Founded",
        type: "string",
        format: "date"
      },
      founders: {
        type: "array",
        default: [],
        title: "Organization Founders",
        items: {
          "type": "object",
          "required": [
            "name",
            "email",
            "title"
          ],
          properties: {
            name: {
              type: "string",
              title: "Founder Name",
            },
            email: {
              type: "string",
              title: "Founder Email",
              format: 'email'
            },
            title: {
                type: "string",
                title: "Position Name"
              },
          }
        }
      }
    },
    required: ["name", "email", "description", "founded"]
  };


export default function CForm({ onSubmit }){
    return (
    <div class="container">
        <div class="row">
      <div class="col-md-6">
        <JSONSchemaForm onSubmit={onSubmit} schema={postSchema} />
      </div>
    </div>
  </div>
);
}