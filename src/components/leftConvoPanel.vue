<template>
    <div>
        <div class="py-4">
            <RouterLink class="userDetails logo d-flex align-items-center justify-content-center" :to="{ path: '/' }">
                <img width="70%" class="img-fluid" src="../assets/main-logo.webp" alt="india gpt">
            </RouterLink>
        </div>
        <div>
            <button :disabled="$store.state.currentConversation.length ===0" @click="createConvo">Create Conversation</button>
        </div>
        <div class="pt-5">
            <ul class="convoId">
                <li :class="{ 'active': convo.conversation_id === $store.state.currentConvoId }"
                    class="fs-5 text-black text-center" v-for="(convo, index) in $store.state.allConvo" :key="convo.conversation_id"
                    @click="getConvoData(convo.conversation_id)"><span>{{ convo.conversation_id }}</span> {{ convo.title
                    }}
                    <button @click.stop="deleteConversation($event, convo.conversation_id)">delete</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "ConvoPanel",
    data() {
        return {
            
        }
    },
    props: {
        createConvo: Function
    },
    mounted() {
        this.getAllconversations();
        console.log(this.$store.state.currentConversation.length);
    },
    activated() {
        this.getAllconversations();
    },
    methods: {
        async getAllconversations() {
            try {
                const response = await axios.get(import.meta.env.VITE_APP_ROOT_API_BASEURL + "user/get-all-conversations",
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            //  'token': this.token Include token in request headers
                            'token': this.$store.state.selectedToken
                        }
                    }
                );
                console.log("response", response.data.data[2].conversation_id);
                console.log("all convo", this.$store.state.allConvo);                
                this.$store.commit('SET_allConvo', response.data.data.sort((a, b) => b.conversation_id - a.conversation_id));
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    console.error("Validation Error:", error.response.data);
                } else {
                    console.error("Error sending password reset email:", error);
                }
            }
        },
        async getConvoData(cid) {
            try {
                const response = await axios.get(import.meta.env.VITE_APP_ROOT_API_BASEURL + "user/get-conversation-data/" + cid,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            //  'token': this.token Include token in request headers
                            'token': this.$store.state.selectedToken
                        }
                    }
                );
                console.log("getConvoData", response.data);
                this.$store.commit('SET_CURRENTCONVO', response.data);
                this.$store.commit('SET_CURRENTCONVOID', cid);
                // this.this.$store.state.allConvo=response.data.data;
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    console.error("Validation Error:", error.response.data);
                } else {
                    console.error("Error sending password reset email:", error);
                }
            }
        },
        async deleteConversation(e, cid) {
            try {
                const response = await axios.delete(import.meta.env.VITE_APP_ROOT_API_BASEURL + "user/delete-conversation/" + cid,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': this.$store.state.selectedToken
                        }
                    }
                );
                console.log("getConvoData", response);
                console.log(e.target.parentElement);
                e.target.parentElement.remove();
                // cid===this.$store.state.currentConvoId && (this.$store.commit('SET_CURRENTCONVO',[]);this.$store.commit('SET_CURRENTCONVOID', null););
                if (cid === this.$store.state.currentConvoId) {
                    // Clear the current conversation and conversation ID in Vuex store
                    this.$store.commit('SET_CURRENTCONVO', []);
                    this.$store.commit('SET_CURRENTCONVOID', null);
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    console.error("Validation Error:", error.response.data);
                } else {
                    console.error("Error sending password reset email:", error);
                }
            }
        },
    }
}
</script>

<style scoped>
.convoId {
    height: 70vh;
    width: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: start;
    overflow-x: hidden;
    scrollbar-width: none;
    padding: 0;
}

.convoId li {
    list-style: none;
    padding: 20px 10px;
    border-radius: 10px;
    background-color: rgb(201, 201, 201);

    cursor: pointer;
}

.convoId li:hover {
    transition: 0.5s;
    background-color: rgb(168, 168, 168);

}

.active {
    background-color: rgb(124, 124, 124) !important;

}
</style>