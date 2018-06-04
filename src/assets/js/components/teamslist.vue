<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">Equipos</li>
            </ol>
        </nav>
        <h1>Equipos</h1>
        <div class="form-group">
            <input type="text" name="search" v-model="teamSearch" placeholder="Buscar un equipo..." class="form-control" v-on:keyup="searchTeams">
        </div>
        <div class="row">
            <div class="col-md-3"  v-for="team in teams">
                <div class="card mb-3 box-shadow text-center border0">
                    <router-link :to="{name: 'teamdetails', params: { id: team.id }}">
                        <img class="card-img-top shieldImg" :src="team.shieldUrl">
                        <div class="card-body">
                            <h4 class="card-text">
                                {{ team.name }}
                            </h4>
                        </div>
                    </router-link>
                </div>
            </div>    
        </div>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                teams: [],
                originalTeams: [],
                teamSearch: ''
            }
        },

        created: function()
        {
            this.getTeams();
        },

        methods: {
            getTeams: function()
            {
                this.$http.get('http://plbackend.fernandoramos.eu/api/v1/teams').then((response) => {
                    this.teams = response.body.sort((a,b) => {
                        return (a.name >= b.name) ? 1 : -1;
                    });
                    this.originalTeams = this.teams;
                }, (response) => {

                });
            },

            searchTeams: function()
            {
                if(this.teamSearch == '')
                {
                    this.teams = this.originalTeams;
                    return;
                }

                var searchedTeams = [];
                for(var i = 0; i < this.originalTeams.length; i++)
                {
                    var productName = this.originalTeams[i]['name'].toLowerCase();
                    if(productName.indexOf(this.teamSearch.toLowerCase()) >= 0)
                    {
                        searchedTeams.push(this.originalTeams[i]);
                    }
                }

                this.teams = searchedTeams;
            }
        }
    }
</script>
