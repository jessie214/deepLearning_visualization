export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        name: 'home',
        path: '/home',
        component: './Home',
      },      
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
