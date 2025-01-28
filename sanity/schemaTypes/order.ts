
  import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique keys

export default {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "customerName",
      title: "Customer Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "text",
    },
    {
      name: "city",
      title: "City",
      type: "string",
    },
    {
      name: "zipCode",
      title: "Zip Code",
      type: "string",
    },
    {
      name: "items",
      title: "Order Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "slug",
              title: "Product Slug",
              type: "string",
            },
            {
              name: "title",
              title: "Product Title",
              type: "string",
            },
            {
              name: "price",
              title: "Product Price",
              type: "number",
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
            },
            {
              name: "imageUrl",
              title: "Product Image URL",
              type: "string",
            },
            {
              name: "size",
              title: "Size",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "string",
            },
            {
              name: "uniqueKey",  // Renamed from _key to uniqueKey
              title: "Unique Key",
              type: "string",
              initialValue: () => uuidv4(), // Generate UUID for each order item
            },
          ],
        },
      ],
    },
    {
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
    },
    {
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ],
};
