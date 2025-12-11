require('app-module-path').addPath(__dirname + '/helpers')

module.exports = {
    cms: {
        'port': 3002,
        
        'mongo': 'mongodb://portalAdmin:p4ssw0rd@ceds-db:27017/portal',
        
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
        name: 'CEDS',
        contato: {
            webmail: 'https://webmail.ita.br',
            contatos: {
                mail: 'mailto:contato@ita.br',
                mailProjeto: {
                    link: 'mailto:ceds@ita.br',
                    name: 'ceds@ita.br',
                },
                comunicacao: 'mailto:comunicacao@ita.br',
                vestibular: 'mailto:vestita@ita.br',
                ramais: 'http://www.portal2.ita.br/contatos',
                telefones: '/post/contatos',
                foneAdministracao: '(12) 3947 5736',
                foneComunicacao: '(12) 3947 6926',
                whatsapp: {
                    link: 'https://wa.me/5512997996099',
                    phone: '(12) 99799-6099',
                },
                //googleFrameMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.9275954082946!2d-45.87707499042888!3d-23.209309148662836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cc4af835bbc7ab%3A0xf62c90e67688ab19!2sITA%20Computer%20Science%20Division!5e0!3m2!1sen!2sbr!4v1762890162521!5m2!1sen!2sbr',
            },
            privacidade: {
                politica: '/post/politica-de-privacidade',
                cookies: '/post/politica-de-cookies',
            },
            termos: {
                uso: '/post/termo-de-uso',
            },
        },
        color: 'marine',
        'view home': 'home',
        social: {
            linkedin: 'https://www.linkedin.com/company/80111773',
        }
    },
    cookies: {
        enabled: true,
    },
}