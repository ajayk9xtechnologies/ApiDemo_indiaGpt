<template>
    <div class="container-fluid">
        <div class="row" style="min-height: 100vh">
            <div class="col-md-3 px-4 leftpanel">
                <ConvoPanel :createConvo="createConversation"/>
            </div>
            <div class="col-md-9">
                <div class="chat-container d-flex h-100 flex-column justify-content-between">
                    <div style="height: 100%;" class="chat-messages p-3">
                        <p>Text message goes here</p>
                        <div class="answer">
                            <div v-if="$store.state.currentConversation.length" v-for="(Convo, index) in $store.state.currentConversation"
                                class="card p-3 text-secondary">
                                <div class=" mb-0">
                                    <h2 class="text-primary">{{ Convo.question }}</h2>
                                </div>
                                <div class=" mb-0">
                                    <p class="fs-5 text-secondary">{{ Convo.response }}</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div v-if="$store.state.currentConvoId==null">
                            <button @click="createConversation">hello</button>
                    </div>
                    <div v-else class="p-4 border-0 bg-transparent">
                        <li class="list-none" v-for="(suggestion, index) in suggestionList" :key="index">
                           {{ suggestion }}
                        </li>
                        <form @submit.prevent="searchQuestion" class="searchBox d-flex gap-2 py-3" id="searchBox">
                            <div class="d-flex w-100 bg-transparent rounded">
                                <input type="search" v-model="question" autocomplete="off" autofocus required name="q"
                                    list="suggestions" class="searchInput form-control form-control-lg border-0"
                                    placeholder="Message IndiaGpt..." aria-label="Search input" />
                                <datalist id="suggestions"></datalist>
                            </div>
                            <div class="d-flex flex-row justify-content-center gap-2">
                                <button type="button" class="searchButton btn btn-outline-default waves"
                                    title="Start Listening">
                                    <i class="bi bi-mic-fill"></i>
                                </button>
                                <input class="searchButton btn btn-outline-default" type="submit" aria-label="Search">
                            </div>
                            <ul class="list-unstyled m-0 p-0 position-absolute top-0 start-0 end-0"
                                style="display: none;">
                                
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ConvoPanel from '../components/leftConvoPanel.vue'

export default {

    name: 'SearchPage',
    components: {
        ConvoPanel,
    },
    data() {
        return {
            question: '',
            timer: null,
            loader: false,
            suggestionList: [],
            answer: '',
            token: ''
        }
    },
    watch: {
        question(newValue, oldValue) {
            console.log(newValue);
            if (this.timer != null) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                this.suggestion();
            }, 100);
        }
    },
    activated() {
        this.suggestionList = []
    },
    methods: {
        increment() {
            this.$store.commit('increment'); // Call the increment mutation
        },
        decrement() {
            this.$store.commit('decrement'); // Call the decrement mutation
        },
        async searchQuestion() {
            this.answer = ''
            try {
                this.loader = true;
                const response = await axios.get(import.meta.env.VITE_APP_ROOT_API_BASEURL + "user/search/" + this.question + "/" + this.$store.state.currentConvoId,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': this.$store.state.selectedToken
                        }
                    }
                );
                console.log("response", response.data);
                this.answer = response.data;
                this.$store.commit('UPDATE_CONVO', {
                    conversation_id: this.$store.state.currentConvoId,
                    question: this.question,
                    response: response.data
                })
                if (this.$store.state.currentConversation.length==1) {
                    this.$store.commit('UPDATE_allConvo', {
                        conversation_id: this.$store.state.currentConvoId,
                        title: this.question,
                })
                    
                }
                console.log(this.$store.state.currentConversation);
                // this.loader = false;
                this.suggestionList = ''
                this.question=''
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    console.error("Validation Error:", error.response.data);
                } else {
                    console.error("Error sending password reset email:", error);
                }
            }
        },
        async suggestion() {
            try {
                const response = await axios.get(import.meta.env.VITE_APP_ROOT_API_BASEURL + "user/search/suggestions/" + this.question)
                this.suggestionList = response.data.suggestions
                console.log("sugg", this.suggestionList);
            } catch (error) {
                console.log(error);
            }
        },
        async createConversation() {
            try {
                console.log("this.$store.state.selectedToken", this.$store.state.selectedToken);
                const response = await axios.post(import.meta.env.VITE_APP_ROOT_API_BASEURL + "user/create-conversation", {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': this.$store.state.selectedToken
                        }
                    }
                );
                console.log("create conversation:", response.data);
                this.$store.commit('SET_CURRENTCONVOID',response.data.conversation_id)
                this.$store.commit('SET_CURRENTCONVO',[])
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
.searchInput {
    background: hsla(0, 0%, 93%, .8);
    color: #000;
    font-family: 'Times New Roman', Times, serif;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    padding: 10px 30px;
}

.leftpanel {
    background: #e4e4e4;
}

.searchButton {
    width: 70px;
    height: 70px;
    flex-shrink: 0;
    background: linear-gradient(180deg, #d1951d 0, #c19e56 100%);
    color: #fff;
}

.answer {
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: flex-end;
    gap: 20px;
}
</style>