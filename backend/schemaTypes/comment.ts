const comment = {
  name: 'comment',
  title: 'Comment',
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
      name: 'message',
      title: 'Message',
      type: 'string',
    },
    {
      name: 'likes',
      title: 'Likes',
        type: 'number',
        defaultValue: 0,
    },
  ],
}

export default comment
