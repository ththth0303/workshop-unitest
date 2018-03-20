import Full from '../containers/Full.vue';
import Dashboard from '../views/Dashboard.vue';
import CompaniesIndex from '../views/Companies/CompaniesIndex.vue';
import CompaniesCreate from '../views/Companies/CompaniesCreate.vue';
import CompaniesEdit from '../views/Companies/CompaniesEdit.vue';
import CategoriesCreate from '../views/Categories/CategoriesCreate.vue';
import CategoriesIndex from '../views/Categories/CategoriesIndex.vue';

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
          path: 'companies',
          name: 'Companies',
          redirect: '/companies/index',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'create',
              name: 'Create',
              component: CompaniesCreate
            },
            {
              path: 'edit/:id',
              name: 'Edit',
              component: CompaniesEdit
            },
            {
              path: 'index',
              name: 'Index',
              component: CompaniesIndex
            }
          ]
        },
        {
          path: 'categories',
          name: 'Categories',
          redirect: '/categories/index',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'create',
              name: 'Create Caretories',
              component: CategoriesCreate
            },
            {
              path: 'edit/:id',
              name: 'Edit Categories',
              component: CompaniesEdit
            },
            {
              path: 'index',
              name: 'Index Category',
              component: CategoriesIndex
            }
          ]
        }
        
      ]
    }
  ]
}
