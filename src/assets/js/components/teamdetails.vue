<template>
    <div>
         <h1><img class="card-img-top shieldIcon" :src="team.shieldUrl"> {{ team.name}}</h1>
         <div class="text-right">
            <router-link :to="{name: 'playernew', params: { teamId:  team.id }}" class="btn btn-primary">Crear un jugador</router-link>
         </div>
         <table class="table table-striped mt20">
            <thead>
                <tr>
                    <th class="sortableLink" @click="sort('number')">Número</th>
                    <th class="sortableLink" @click="sort('fullName')">Nombre</th>
                    <th class="sortableLink" @click="sort('position')">Posición</th>
                    <th class="sortableLink" @click="sort('birthDate')">Fecha de nacimiento</th>
                    <th class="sortableLink" @click="sort('nationality')">Nacionalidad</th>
                </tr>
            </thead>
            <tbody v-if="team">
                <tr v-for="player in sortedPlayers">
                    <td>{{ player.number }}</td>
                    <td>{{ player.fullName }}</td>
                    <td>{{ player.position }}</td>
                    <td>{{ player.birthDate }}</td>
                    <td>{{ player.nationality }}</td>
                </tr>
            </tbody>
         </table>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                team: [],
                currentSort:'number',
                currentSortDir:'asc',
                loaded: false,
            }
        },

        created: function()
        {
            this.getTeam();
        },

        methods: {
            sort:function(s) {
              if(s === this.currentSort) {
                this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
              }
              this.currentSort = s;
            },
            getTeam: function()
            {
                this.$http.get('http://plbackend.fernandoramos.eu/api/v1/team/' + this.$route.params.id).then((response) => {
                    this.team = response.body;
                    this.loaded = true;
                }, (response) => {

                });
            },
        },

        computed:{
            sortedPlayers:function() {
              if(this.loaded === false){
                return {};
              }
              return this.team.players.sort((a,b) => {
                let modifier = 1;
                if(this.currentSortDir === 'desc') modifier = -1;
                if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                return 0;
              });
            }
        }
    }
</script>