<template>
    <v-container grid-list-xs>
        <v-layout column v-if="!!dog">
            <v-flex>
                <v-img
                :src="drink.url"
                ></v-img>
            </v-flex>
            <v-flex>
                <h1>{{ drink.comment }}</h1>
                <p class="subtitle">{{ drink.info }}</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from '../firebaseConfig.js'
export default {
    props:{
        drinkProp:{
            type:Object,
        }
    },
    data(){
        return{
            drink:undefined
        }
    },
    mounted(){
        if(!!this.drinkProp){
            this.drink = this.drinkProp
        }else{
            const id = this.$route.params.id
            firebase.db.doc(`drinks/${id}`).get()
            .then((doc) => {
                if (doc.exists) {
                    this.drink = doc.data();
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
            console.log("Error getting document:", error);
        });
        }
    }
}
</script>
