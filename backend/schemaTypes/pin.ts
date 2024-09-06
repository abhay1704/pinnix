export default {
  name: 'pin',
  title: 'Pin',
  type: 'document',

  fields: [
    {
      name: 'owner',
      title: 'Owner',
      type: 'reference',
      to: [
        {
          type: 'user',
        },
      ],
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'number',
      defaultValue: 0,
    },

    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },

    {
      name: 'destination',
      title: 'Destination',
      type: 'string',
    },

    {
      name: 'save',
      title: 'Save',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'user',
            },
          ],
        },
      ],
    },

    {
      name: 'comments',
      title: 'Comments',
      type: 'array',

      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'comment',
            },
          ],
        },
      ],
    },
  ],
}
