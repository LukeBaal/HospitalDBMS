<template>
  <v-container>
    <h2>Staff</h2>
    <v-layout row wrap>
      <v-flex xs12>
        <v-data-table :headers="headers" :items="staff" hide-actions>
          <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{props.item.dno}}</td>
            <td class="text-xs-right">{{props.item.dname}}</td>
            <td class="text-xs-right">{{props.item.ssn}}</td>
            <td class="text-xs-right">{{props.item.name}}</td>
            <td class="text-xs-right">{{props.item.position}}</td>
            <td class="text-xs-right">{{props.item.gender}}</td>
            <td class="text-xs-right">{{props.item.address}}</td>
            <td class="text-xs-right">{{props.item.phone}}</td>
            <td class="text-xs-right">{{props.item.birthdate}}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'staff',
  data () {
    return {
      staff: [],
      headers: [
        {text: 'Department #', value: 'dno'},
        {text: 'Department', value: 'dname'},
        {text: 'SSN', value: 'ssn'},
        {text: 'Name', value: 'name'},
        {text: 'Position', value: 'position'},
        {text: 'Gender', value: 'gender'},
        {text: 'Address', value: 'address'},
        {text: 'Phone', value: 'phone'},
        {text: 'Birth Date', value: 'birthdate'}
      ]
    }
  },
  created () {
    db.collection('departments').orderBy('dno').get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        db.collection('departments').doc(doc.id).collection('staff').get().then((query) => {
          query.forEach(emp => {
            const data = {
              'id': emp.id,
              'dno': doc.data().dno,
              'dname': doc.data().name,
              'ssn': emp.data().ssn,
              'name': emp.data().name,
              'position': emp.data().position,
              'gender': emp.data().gender,
              'address': emp.data().address,
              'phone': emp.data().phone,
              'birthdate': emp.data().birthdate
            }
            this.staff.push(data)
          })
        })
      })
    })
  }
}
</script>
