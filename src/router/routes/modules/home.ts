const home = [{
  path: "/home",
  name: "Home",
  component: () => import("~/views/home/index.vue"),
  meta: {
    title: "Home",
  },
},
];

export default home;
