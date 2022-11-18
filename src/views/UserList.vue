<template>
    <ContentBase>
        <div class="card" v-for="user in users" :key="user.id" @click="open_user_profile(user.id)">
            <div class="card-body">
                <div class="row">
                    <div class="col-1 img-field">
                        <img  class="img-fluid" :src="user.photo" alt="">
                    </div>
                    <div class="col-11">
                        <div class="username">{{ user.username }}</div>
                        <div class="follow-count">{{ user.followerCount }}</div>
                    </div>
                </div>
            </div>
        </div>
    </ContentBase>
</template>

<script>
import ContentBase from '../components/ContentBase';
import $ from 'jquery';
import { ref } from 'vue';  //:src 把字符串里的内容取值
import router from '@/router/index';
import { useStore } from 'vuex';

export default {
    name: 'UserList',
    components: {
        ContentBase,
    },

    setup() {
        const store = useStore();
        let users = ref([]);

        $.ajax({
            url: 'https://app165.acapp.acwing.com.cn/myspace/userlist/',    //同一个链接可以对应不同的方法
            type: "get",
            success(resp) {
                users.value = resp;
            }
        });

        // 打开用户主页
        const open_user_profile = userId => {
            if (store.state.user.is_login) {
                router.push({
                    name: "userprofile",
                    params: {
                        userId
                    }
                });
            } else {
                router.push({
                    name: "login",
                })
            }
        }

        return {
            users,
            open_user_profile,
        };
    }
}
</script>

<style scoped>
img {
    border-radius: 50%;
}

.username {
    font-weight: bold;
    height: 50%;
}

.follow-count {
    font-size: 12px;
    color: gray;
    height: 50%;
}

.card {
    margin-bottom: 10px;
    cursor: pointer;
}

.img-field {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.card:hover {
    box-shadow: 2px 2px 10px lightgrey;
    transition: 500ms;
}
</style>
