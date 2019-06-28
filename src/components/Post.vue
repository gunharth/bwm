<template>
    <v-container grid-list-xs>
        <v-layout>
            <v-flex>
                <div id="spinner_container">
                    <v-progress-circular v-if="loading" v-bind:size="40" indeterminate color="pink" class="spinner">
                    </v-progress-circular>
                </div>

                <img :src="this.drinkUrl" />

                <v-container fluid style="min-height: 0" grid-list-lg>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-text-field v-model="title" name="title" label="What are you up to?" id="title"/>
                            <v-btn block color="primary"
                            @click="post()">
                                Post Drink
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
import postDrink from './mixins/postDrink.js'
export default {
    props:{
        pictureUrl:{
            default:'',
            type:String
        }
    },
    data(){
        return {
            drinkUrl: null,
            title:'',
            loading:true,
        }
    },
    mounted(){
        if(this.pictureUrl !== ''){
            this.drinkUrl = this.pictureUrl;
            this.loading=false;
        }else{
            axios.get('https://dog.ceo/api/breed/appenzeller/images/random').then(response => {
                if(response.data.status){
                    this.drinkUrl = response.data.message;
                    this.loading=false;
                }else{
                    console.log("Error getting image")
                }
            })
        }

    },
    methods:{
        post(){
            let authorId = this.$store.getters.user.id;
            let authorNickname;
            if(this.$store.getters.user.nickname === undefined) {
                authorNickname = this.$store.getters.user.realname;
            } else {
                authorNickname = this.$store.getters.user.nickname;
            }
            postDrink(this.drinkUrl, this.title, authorNickname, authorId)
        }
    }
}
</script>

<style scoped>
img {
    max-width: 100%;
    height: auto;
    width: auto\9;
    /* ie8 */
}
#spinner_container{
    text-align: center;
}
.spinner{
    margin:auto;
    margin: 4rem;
}
</style>
