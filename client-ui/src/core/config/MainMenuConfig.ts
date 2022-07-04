const DocMenuConfig = [
  {
    pages: [
      {
        heading: "Home",
        route: "/",
        svgIcon: "svg/icons/art002.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  },
  {
    heading: "users",
    route: "/users",
    pages: [
      {
        heading: "All users",
        route: "/users",
        svgIcon: "svg/icons/gen014.svg",
        fontIcon: "bi-calendar3-event",
      },
    ],
  },
  {
    heading: "products",
    route: "/products",
    pages: [
      {
        heading: "All products",
        route: "/products",
        svgIcon: "svg/icons/gen014.svg",
        fontIcon: "bi-calendar3-event",
      },
      {
        heading: "create products",
        route: "/products/create",
        svgIcon: "svg/icons/gen014.svg",
        fontIcon: "bi-calendar3-event",
      },
    ],
  },
  {
    heading: "crategories",
    route: "/crategories",
    pages: [
      {
        heading: "All crategories",
        route: "/crategories",
        svgIcon: "svg/icons/gen014.svg",
        fontIcon: "bi-calendar3-event",
      },
      {
        heading: "create crategories",
        route: "/crategories/create",
        svgIcon: "svg/icons/gen014.svg",
        fontIcon: "bi-calendar3-event",
      },
    ],
  },

  {
    sectionTitle: "authentication",
    svgIcon: "svg/icons//teh004.svg",
    fontIcon: "bi-sticky",
    sub: [
      {
        sectionTitle: "basicFlow",
        sub: [
          {
            heading: "signIn",
            route: "/auth/sign-in",
          },
          {
            heading: "signUp",
            route: "/auth/sign-up",
          },
          {
            heading: "passwordReset",
            route: "/auth/password-reset",
          },
          {
            heading: "emailResetPassword",
            route: "/auth/email-reset-password",
          },
          {
            heading: "msgResetPassword",
            route: "/auth/msg-reset-password",
          },
        ],
      },
      {
        heading: "error404",
        route: "/404",
      },
    ],
  },
  {
    pages: [],
  },
];
export default DocMenuConfig;
