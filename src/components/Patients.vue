<template>
  <v-container>
    <h2>Patients</h2>
    <v-data-table :headers="headers" :items="patients" hide-actions>
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{props.item.hcn}}</td>
        <td class="text-xs-right">{{props.item.name}}</td>
        <td class="text-xs-right">{{props.item.gender}}</td>
        <td class="text-xs-right">{{props.item.address}}</td>
        <td class="text-xs-right">{{props.item.phone}}</td>
        <td class="text-xs-right">{{props.item.birthdate}}</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'patients',
  data () {
    return {
      headers: [
        {text: 'HCN', value: 'hcn'},
        {text: 'Name', value: 'name'},
        {text: 'Gender', value: 'gender'},
        {text: 'Address', value: 'address'},
        {text: 'Phone', value: 'phone'},
        {text: 'Birth Date', value: 'birthdate'}
      ],
      patients: []
    }
  },
  created () {
    db.collection('patients').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = {
          'id': doc.id,
          'address': doc.data().address,
          'birthdate': doc.data().birthdate,
          'gender': doc.data().gender,
          'hcn': doc.data().hcn,
          'name': doc.data().name,
          'phone': doc.data().phone
        }
        this.patients.push(data)
      })
    })
  }
}
</script>
