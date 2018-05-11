<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card color="secondary">
          <v-card-title class="headline" primary-title>Patient Lookup:</v-card-title>
          <v-card-text class="white--text">
            <v-select 
              :items="rooms" 
              label="Select Patient" 
              item-value="item" 
              item-text="name" 
              v-model="selected"
              editable>
              </v-select>
          </v-card-text>
        </v-card>
        <v-card class="mt-2" color="secondary">
          <v-card-title class="headline" primary-title>Patient Location:</v-card-title>          
          <v-card-text>
            <v-list>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title v-if="selected.dno">Department #{{selected.dno}}: {{selected.dname}}</v-list-tile-title>                  
                  <v-list-tile-title v-if="selected.rno">Room #{{selected.rno}}: {{selected.rname}}</v-list-tile-title>                  
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import db from './firebaseInit'
  export default {
    name: 'patientlookup',
    data () {
      return {
        rooms: [],
        selected: []
      }
    },
    created () {
      db.collection('departments').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          db.collection('departments').doc(doc.id).collection('rooms').get().then(query => {
            query.forEach(room => {
              if (room.data().occupant) {
                db.collection('patients').where('hcn', '==', room.data().occupant).get().then(innerQuerry => {
                  innerQuerry.forEach(patient => {
                    const data = {
                      'id': room.id,
                      'dno': doc.data().dno,
                      'dname': doc.data().name,
                      'rno': room.data().rno,
                      'rname': room.data().name,
                      'hcn': patient.data().hcn,
                      'name': patient.data().name
                    }
                    this.rooms.push(data)
                  })
                })
              }
            })
          })
        })
      })
    }
  }
</script>
