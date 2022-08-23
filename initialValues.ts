export const initialValues = {
  status: [
    {
      name: "Backlog",
      description: "Conjunto com todas as demandas."
    },
    {
      name: "Para Fazer",
      description: "Demandas que serão feitas o mais rápido possível."
    },
    {
      name: "Fazendo",
      description: "Demandas que estão sendo feitas."
    },
    {
      name: "Feito",
      description: "Demandas encerradas."
    }
  ],
  areas: [
    {
      name: "Supervisão",
      description: ""
    },
    {
      name: "Desenvolvimento",
      description: ""
    },
    {
      name: "Recursos Humanos",
      description: ""
    }
  ],
  roles: [
    {
      name: "Admin",
      description: "Responsável por gerir o sistema, mantendo os status, usuários, papeis, etc."
    },
    {
      name: "Developer",
      description: "Responsável por fazer as demandas."
    },
    {
      name: "Area",
      description: "Responsável por criar as demandas."
    }
  ]
}
