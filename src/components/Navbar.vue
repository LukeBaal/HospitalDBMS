<template>
  <div>
    <v-toolbar color="info" v-if="this.$route.params.user == 'staff'">
      <v-toolbar-title>
        <router-link to="/" class="white--text" style="text-decoration:none;">Hospital DBMS</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn :to="{ name: 'rooms', params: {user: 'staff'}}" class="white--text" flat>Rooms</v-btn>        
        <v-btn :to="{ name: 'patients', params: {user: 'staff'}}" class="white--text" flat>Patients</v-btn>
        <v-btn :to="{ name: 'doctors', params: {user: 'staff'}}" class="white--text" flat>Doctors</v-btn>
        <v-btn :to="{ name: 'staff', params: {user: 'staff'}}" class="white--text" flat>Staff</v-btn>
        <v-btn :to="{ name: 'patientlookup', params: {user: 'staff'}}" class="white--text" flat>Patient Lookup</v-btn>
        <v-btn :to="{ name: 'records', params: {user: 'staff'}}" class="white--text" flat>Records</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-toolbar color="success" v-else>
      <v-toolbar-title>
        <router-link to="/" class="white--text" style="text-decoration:none;">Hospital DBMS</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn :to="{ name: 'patientlookup', params: {user: 'patient'}}" class="white--text" flat>Patient Lookup</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>
