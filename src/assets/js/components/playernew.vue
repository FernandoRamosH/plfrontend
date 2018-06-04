<template>
    <div>
        <h1>Nuevo jugador del {{ team.name }}</h1>

        <form class="form form-horizontal" v-on:submit.prevent="createPlayer">
            <div class="form-group row">
                <label name="product_id" class="col-2 col-form-label">Nombre completo</label>
                <div class="col-10">
                    <input type="text" class="form-control" v-model="player.id">
                </div>
            </div>
            <div class="form-group row">
                <label name="product_id" class="col-2 col-form-label">Número</label>
                <div class="col-10">
                    <input type="number" class="form-control" v-model="player.number" min="1" max="100">
                </div>
            </div>
            <div class="form-group row">
                <label name="product_id" class="col-2 col-form-label">Posición</label>
                <div class="col-10">
                    <input type="text" class="form-control" v-model="player.position">
                </div>
            </div>            
            <div class="form-group row">
                <label name="product_id" class="col-2 col-form-label">Fecha de nacimiento</label>
                <div class="col-10">
                    <input type="date" class="form-control" v-model="player.birthDate">
                </div>
            </div>    

            <div class="form-group">
                <button class="btn btn-primary">Create</button>
            </div>
        </form>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                team: [],
                player: [],
            }
        },

        created: function()
        {
            this.getTeam();
        },

        methods: {
            getTeam: function()
            {
                this.$http.get('http://plbackend.fernandoramos.eu/api/v1/team/' + this.$route.params.teamId).then((response) => {
                    this.team = response.body;
                    this.player.teamId = this.team.id;
                }, (response) => {

                });
            },
            createPlayer: function()
            {
                this.$http.post('http://plbackend.fernandoramos.eu/api/v1/player', this.player, {
                     headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response) => {
                    alert('OK');
                }, (response) => {
                    alert('KO');
                });
            }
        },
    }
</script>