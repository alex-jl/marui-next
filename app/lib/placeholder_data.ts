// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '019eadfe-f764-751f-89fe-67695ec38f77',
    name: 'Alice A',
    email: 'alice@nextmail.com',
    avatar_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80'
  },
  {
    id: '019eadff-2197-7e57-933b-f79d441fe42d',
    name: 'Bob B',
    email: 'bob@nextmail.com',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80'
  },
  {
    id: '019eadff-456d-7be7-a6ba-1ad82aefeeef',
    name: 'Charlie C',
    email: 'charlie@nextmail.com',
    avatar_url: null,
  },
];

const posts = [
  {
    id: '019eae00-6204-74e9-bd46-35979cf2ddd8',
    user_id: '019eadfe-f764-751f-89fe-67695ec38f77',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
  },
  {
    id: '019eae01-a8a9-7244-89a9-69e72fc17b2f',
    user_id: '019eadff-2197-7e57-933b-f79d441fe42d',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: '019eae01-d09d-7509-9324-14d9c792c005',
    user_id: '019eadff-456d-7be7-a6ba-1ad82aefeeef',
    content: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
  },
];

export { users, posts };
