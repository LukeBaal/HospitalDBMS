<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card color="secondary">
          <v-card-title primary-title class="headline">Patient Records:</v-card-title>
          <v-card-text class="white--text">
            <v-select 
              :items="patients" 
              label="Select Patient" 
              item-value="item" 
              item-text="name" 
              v-model="selected"
              editable>
              </v-select>
          </v-card-text>
        </v-card>
        <v-data-table :headers="headers" :items="selected.records" hide-actions>
          <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{props.item.caseno}}</td>
            <td class="text-xs-right">{{props.item.illness}}</td>
            <td class="text-xs-right">{{props.item.medication}}</td>
            <td class="text-xs-right">{{props.item.symptoms}}</td>
            <td class="text-xs-right">{{props.item.startdate}}</td>
            <td class="text-xs-right">{{props.item.doctorname}}</td>
            <td class="text-xs-right">{{props.item.enddate}}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import db from './firebaseInit'
  export default {
    name: 'records',
    data () {
      return {
        patients: [],
        selected: [],
        headers: [
          {text: 'Case #', value: 'caseno'},
          {text: 'Illnesss', value: 'illnesss'},
          {text: 'Medication', value: 'medication'},
          {text: 'Symptoms', value: 'symptoms'},
          {text: 'Start Date', value: 'startdate'},
          {text: 'Doctor', value: 'doctorname'},
          {text: 'End Date', value: 'enddate'}
        ]
      }
    },
    created () {
      db.collection('patients').orderBy('name').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const records = []
          db.collection('patients').doc(doc.id).collection('records').get().then(query => {
            query.forEach(record => {
              records.push({
                'value': false,
                'id': doc.id,
                'caseno': record.data().caseno,
                'doctorname': record.data().doctorname,
                'enddate': record.data().enddate,
                'illness': record.data().illness,
                'medication': record.data().medication,
                'startdate': record.data().startdate,
                'symptoms': record.data().symptoms
              })
            })
          })
          const data = {
            'value': false,
            'id': doc.id,
            'hcn': doc.data().hcn,
            'name': doc.data().name,
            'records': records
          }
          this.patients.push(data)
        })
      })
    }
  }
</script>
