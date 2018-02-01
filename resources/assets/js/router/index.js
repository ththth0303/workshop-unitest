import Full from '../containers/Full.vue';
import Dashboard from '../views/Dashboard.vue';
import CompaniesIndex from '../views/Companies/CompaniesIndex.vue';
import CompaniesCreate from '../views/Companies/CompaniesCreate.vue';
import CompaniesEdit from '../views/Companies/CompaniesEdit.vue';

export default {
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'companies/create',
          name: 'createCompany',
          component: CompaniesCreate
        },
        {
          path: 'companies',
          name: 'companies',
          component: CompaniesIndex,
        },
        {
          path: 'companies/edit/:id',
          name: 'editCompany',
          component: CompaniesEdit
        }
      ]
    }
  ]
}
