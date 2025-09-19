require('app-module-path').addPath(__dirname + '/helpers')

module.exports = {
    cms: {
        'port': 3003,
        
	    'mongo': 'mongodb://portalAdmin:p4ssw0rd@drone-db:27017/portal',
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
        name: 'Drone Comp',
        contato: {
            webmail: 'https://webmail.ita.br',
            contatos: {
                mail: 'mailto:contato@ita.br',
                mailProjeto: 'mailto:dronecomp@ita.br',
                comunicacao: 'mailto:comunicacao@ita.br',
                vestibular: 'mailto:vestita@ita.br',
                ramais: 'http://www.portal2.ita.br/contatos',
                telefones: '/post/contatos',
                foneAdministracao: '(12) 3947 5736',
                foneComunicacao: '(12) 3947 6926',
                foneProjeto: '(12) 3947 5896',
            },
            privacidade: {
                politica: '/post/politica-de-privacidade',
                cookies: '/post/politica-de-cookies',
            },
            termos: {
                uso: '/post/termo-de-uso',
            },
        },
        color: 'dark',
        'view home': 'home',
        social: {
            github: 'https://github.com/drone-comp',
            facebook: 'https://www.facebook.com/drone.comp.7',
            linkedin: 'https://www.linkedin.com/company/76928182/',
            youtube: 'https://www.youtube.com/channel/UC6g9n3EuVUNb19h8Oh9LynA',
        }
    },
    cookies: {
        enabled: true,
    },
}
