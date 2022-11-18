<template>
    <ContentBase>
        <div class="row">
            <div class="col-3">
                <UserProfileInfo @follow="follow" @unfollow="unfollow" v-bind:user="user"/>
                <UserProfileWrite v-if="is_me" @post_a_post="post_a_post" />
            </div>
            <div class="col-9">
                <UserProfilePosts :user="user" :posts="posts" @delete_a_post="delete_a_post"/>
            </div>
        </div>
    </ContentBase>
</template>

<script>
import ContentBase from '../components/ContentBase';
import UserProfileInfo from '../components/UserProfileInfo';
import UserProfilePosts from '../components/UserProfilePosts';
import UserProfileWrite from '../components/UserProfileWrite';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import $ from 'jquery';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
    name: 'UserProfile',
    components: {
        ContentBase,
        UserProfileInfo,
        UserProfilePosts,
        UserProfileWrite,
    },
    setup: () => {  // 接收子页面传输的数据
        const store = useStore();
        const route = useRoute();
        const userId = parseInt(route.params.userId);     // 取得链接中的ID
        const user = reactive({ //交互数据放入顶层结点

        });

        const posts = reactive({

        });

        // 获取某个用户信息
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type: "GET",
            data: {
                user_id: userId,
            },

            headers: {
                'Authorization': "Bearer " + store.state.user.access,
            },

            success(resp) {
                user.id = resp.id;
                user.username = resp.username;
                user.photo = resp.photo;
                user.followerCount = resp.followerCount;
                user.is_followed = resp.is_followed;
            }
        });

        // 获取某个用户所有帖子
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/post/",
            type: "GET",

            data: {
                user_id: userId,
            },

            headers: {
                'Authorization': "Bearer " + store.state.user.access,
            },

            success(resp) {
                posts.count = resp.length;
                posts.posts = resp;

            }
        })

        const follow = () => {
            if (user.is_followed) return;
            user.is_followed = true;
            user.followerCount++;
        };

        const unfollow = () => {
            if (!user.is_followed) return;
            user.is_followed = false;
            user.followerCount--;
        };

        const post_a_post = (content) => {
            posts.count++;
            posts.posts.unshift({
                //在数组最前面加一个元素
                id: posts.count,
                userId: 1,
                content: content,
            })
        };

        const delete_a_post = post_id => {
            posts.posts = posts.posts.filter(post => post.id !== post_id);
            posts.count = posts.posts.length;
        }

        // 判断是不是自己
        const is_me = computed(() => userId === store.state.user.id)

        return {
            user: user,
            follow, // 必须返回，不返回的话无法调用
            unfollow,
            posts,
            post_a_post,
            userId,
            is_me,
            delete_a_post,
        }
    }
}
</script>

<style scoped>

</style>
