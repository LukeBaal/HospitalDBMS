<template>
  <v-container>
    <h2>Departments</h2>
    <v-layout row wrap>
      <v-flex xs12>
        <v-data-table :headers="headers" :items="rooms" hide-actions>
          <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{props.item.dno}}</td>
            <td class="text-xs-right">{{props.item.dname}}</td>
            <td class="text-xs-right">{{props.item.rno}}</td>
            <td class="text-xs-right">{{props.item.rname}}</td>
            <td class="text-xs-right" v-if="props.item.occupant.hcn">
              <v-chip>{{props.item.occupant.hcn}}: {{props.item.occupant.name}}</v-chip>
            </td>
            <td class="text-xs-right" color="green" v-else>
              <v-chip color="green">Availible</v-chip>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container >
</template>


<script>
import db from './firebaseInit'
export default {
  name: 'rooms',
  data () {
    return {
      rooms: [],
      patients: null,
      headers: [
        {text: 'Department #', value: 'dno'},
        {text: 'Department', value: 'dname'},
        {text: 'Room #', value: 'rno'},
        {text: 'Room', value: 'rname'},
        {text: 'Occupant', value: 'occupant'}
      ]
    }
  },
  created () {
    db.collection('departments').orderBy('dno').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        db.collection('departments').doc(doc.id).collection('rooms').get().then((query) => {
          query.forEach(room => {
            let occupant = {
              hcn: null,
              name: null
            }
            if (room.data().occupant) {
              db.collection('patients').where('hcn', '==', room.data().occupant).get().then(innerQuerry => {
                innerQuerry.forEach(patient => {
                  occupant.hcn = patient.data().hcn
                  occupant.name = patient.data().name
                })
              })
            }
            const data = {
              'id': room.id,
              'dno': doc.data().dno,
              'dname': doc.data().name,
              'rno': room.data().rno,
              'rname': room.data().name,
              'occupant': occupant
            }
            this.rooms.push(data)
          })
        })
      })
    })
  }
}
</script>
