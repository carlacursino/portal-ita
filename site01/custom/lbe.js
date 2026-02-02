require('app-module-path').addPath(__dirname + '/helpers')

module.exports = {
    cms: {
        'port': 3004,

        //'mongo': 'mongodb://wmlabbioeng:gC%3dVvYf39-C%26S2yR@localhost:27017/DB_LABBIOENG',
        'mongo': 'mongodb://portalAdmin:p4ssw0rd@lbe-db:27017/portal',

        'cookie secret': 'MEVlYiAtykSik1hZfEJgqg',

        'frontPageCategories': { categories: { $in: ['600752c79973ae058e39d84d'] } },

        // 'ldap server': {
        //     url: 'ldaps://161.24.23.215:636',
        // },
        'ldap auth user': 'cn=ADMIN-DO-PORTAL,ou=internal,ou=users,dc=ita,dc=br',
        'ldap auth password': 'SENHA-DO-ADMIN-DO-PORTAL-NO-LDAP',
        'ldap query base': '|(&(objectClass=brPerson)(|(employeeType=professor)(employeeType=funcionario)))(uid=cursino)',
        'ldap query user': {
            scope: 'sub',
            attrs: '*',
        },
        'ldap query user id': 'uid',
        'ldap query user class': '(|(&(objectClass=brPerson)(|(employeeType=professor)(employeeType=funcionario)))(uid=cursino))',
        // 'ldap query role': {
        //     filter: '(objectClass=groupOfNames)',
        //     scope: 'sub',
        //     attrs: '*',
        // },
    },
    portal: {
        name: 'LBE',
        contato: {
            webmail: 'https://webmail.ita.br',
            contatos: {
                mail: 'mailto:contato@ita.br',
                mailProjeto: {
                    link: 'mailto:lbe@ita.br',
                    name: 'lbe@ita.br',
                },
                comunicacao: 'mailto:comunicacao@ita.br',
                vestibular: 'mailto:vestita@ita.br',
                ramais: 'http://www.portal2.ita.br/contatos',
                telefones: '/post/contatos',
                foneAdministracao: '(12) 3947 5736',
                foneComunicacao: '(12) 3947 6926',
                googleFrameMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.940652529597!2d-45.877608626142134!3d-23.208833348732806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cc4af82272b427%3A0x38e247d6f631128b!2sLaborat%C3%B3rio%20de%20Bioengenharia%20(LBE)%20-%20ITA!5e0!3m2!1sen!2sbr!4v1762871137219!5m2!1sen!2sbr',
            },
            privacidade: {
                politica: '/post/politica-de-privacidade',
                cookies: '/post/politica-de-cookies',
            },
            termos: {
                uso: '/post/termo-de-uso',
            },
        },
        color: 'teal',
        'view home': 'home',
    },
    cookies: {
        enabled: true,
    },
}
