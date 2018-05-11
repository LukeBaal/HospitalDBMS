<template>
  <v-container class="mt-5">
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2>
        <v-card class="primary white--text pt-4 pb-4">
          <v-card-text>
            <v-layout column align-center justify-center>
            <v-flex xs12>
              <h1 class="headline">Welcome</h1>
            </v-flex>
            <v-flex xs12>
              <hr>
              <v-btn :to="{ name: 'patientlookup', params: {user: 'patient'}}" color="success">Patients/Visitors</v-btn>
            </v-flex>
            <v-flex xs12>
              <v-btn :to="{ name: 'rooms', params: {user: 'staff'}}" color="info">Doctors/Staff</v-btn>
            </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container >
</template>


<script>
export default {
  name: 'dashboard',
  data () {
    return {

    }
  }
}
</script>
