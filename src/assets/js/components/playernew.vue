<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">
                    <router-link :to="{name: 'teamslist'}">Equipos</router-link>
                </li>
                <li class="breadcrumb-item" aria-current="page">
                    <router-link :to="{name: 'teamdetails', params: { id: team.id }}">{{ team.name}}</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Crear un jugador</li>
            </ol>
        </nav>
        <h1><img class="card-img-top shieldIcon" :src="team.shieldUrl"> Nuevo jugador del {{ team.name }}</h1>
        <form class="form form-horizontal" v-on:submit.prevent="createPlayer">
            <div class="form-group row">
                <label name="product_id" class="col-2 col-form-label">Nombre completo</label>
                <div class="col-10">
                    <input type="text" class="form-control" v-model="player.fullName" id="player_fullName" required>
                </div>
            </div>
            <div class="form-group row">
                <label name="product_id" class="col-2 col-form-label">Número</label>
                <div class="col-10">
                    <input type="number" class="form-control" v-model="player.number" min="1" max="100" id="player_number" required>
                </div>
            </div>
            <div class="form-group row">
                <label name="product_id" class="col-2 col-form-label">Posición</label>
                <div class="col-10">
                    <select class="form-control" v-model="player.position" id="player_position" required>
                        <option value="Central">Central</option>
                        <option value="Delantero centro">Delantero centro</option>
                        <option value="Extremo derecho">Extremo derecho</option>
                        <option value="Extremo izquierdo">Extremo izquierdo</option>
                        <option value="Lateral derecho">Lateral derecho</option>
                        <option value="Lateral izquierdo">Lateral izquierdo</option>
                        <option value="Mediapunta">Mediapunta</option>
                        <option value="Mediocentro">Mediocentro</option>
                        <option value="Mediocentro defensivo">Mediocentro defensivo</option>
                        <option value="Mediocentro ofensivo">Mediocentro ofensivo</option>
                        <option value="Portero">Portero</option>
                    </select>
                </div>
            </div>            
            <div class="form-group row">
                <label name="product_id" class="col-2 col-form-label">Fecha de nacimiento</label>
                <div class="col-10">
                    <input type="date" class="form-control" v-model="player.dateOfBirth" id="player_dateOfBirth" required>
                </div>
            </div>
            <div class="form-group row">
                <label name="product_id" class="col-2 col-form-label">Nacionalidad</label>
                <div class="col-10">
                    <input type="text" class="form-control" v-model="player.nationality" id="player_nationality" required>
                </div>
            </div>

            <div class="form-group">
                <button class="btn btn-primary">Crear</button>
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
                }, (response) => {

                });
            },
            createPlayer: function()
            {
                let playerData = {
                    fullName: this.player.fullName,
                    teamId:  this.team.id,
                    nationality:  this.player.nationality,
                    dateOfBirth:  this.player.dateOfBirth,
                    position:  this.player.position,
                    number:  this.player.number,
                }
                this.$http.post('http://plbackend.fernandoramos.eu/api/v1/player',playerData , {emulateJSON: true}).then((response) => {
                    swal("Jugador creado con éxito.","", "success")
                        .then((value) => {
                            this.$router.push('/team/' + this.team.id)
                        });

                }, (response) => {
                    console.log(player)
                });
            }
        },
    }
</script>