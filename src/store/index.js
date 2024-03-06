import { createStore } from "vuex";
import storeAuth from "@/components/auth/store/index";

export default createStore({
    modules: {
        storeAuth,
    },
});
