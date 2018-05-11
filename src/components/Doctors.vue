<template>
  <v-container>
    <h2>Doctors</h2>
    <v-layout row wrap>
      <v-flex xs12>
        <v-data-table :headers="headers" :items="doctors" hide-actions>
          <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{props.item.dno}}</td>
            <td class="text-xs-right">{{props.item.dname}}</td>
            <td class="text-xs-right">{{props.item.ssn}}</td>
            <td class="text-xs-right">{{props.item.name}}</td>
            <td class="text-xs-right">{{props.item.gender}}</td>
            <td class="text-xs-right">{{props.item.startdate}}</td>
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
  name: 'doctors',
  data () {
    return {
      doctors: [],
      headers: [
        {text: 'Department #', value: 'dno'},
        {text: 'Department', value: 'dname'},
        {text: 'SSN', value: 'ssn'},
        {text: 'Name', value: 'name'},
        {text: 'Gender', value: 'gender'},
        {text: 'Start Date', value: 'startdate'},
        {text: 'Address', value: 'address'},
        {text: 'Phone', value: 'phone'},
        {text: 'Birth Date', value: 'birthdate'}
      ]
    }
  },
  created () {
    db.collection('departments').orderBy('dno').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        db.collection('departments').doc(doc.id).collection('doctors').get().then((query) => {
          query.forEach(doctor => {
            const data = {
              'value': false,
              'id': doctor.id,
              'dno': doc.data().dno,
              'dname': doc.data().name,
              'address': doctor.data().address,
              'birthdate': doctor.data().birthdate,
              'gender': doctor.data().gender,
              'name': doctor.data().name,
              'phone': doctor.data().phone,
              'ssn': doctor.data().ssn,
              'startdate': doctor.data().startdate
            }
            this.doctors.push(data)
          })
        })
      })
    })
  }
}
</script>
