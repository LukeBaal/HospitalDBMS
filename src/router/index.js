import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Rooms from '@/components/Rooms'
import Patients from '@/components/Patients'
import Doctors from '@/components/Doctors'
import Staff from '@/components/Staff'
import PatientLookup from '@/components/PatientLookup'
import Records from '@/components/Records'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: Rooms
    },
    {
      path: '/patients',
      name: 'patients',
      component: Patients
    },
    {
      path: '/doctors',
      name: 'doctors',
      component: Doctors
    },
    {
      path: '/staff',
      name: 'staff',
      component: Staff
    },
    {
      path: '/patientlookup',
      name: 'patientlookup',
      component: PatientLookup
    },
    {
      path: '/records',
      name: 'records',
      component: Records
    }
  ]
})
