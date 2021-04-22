<template>
  <div class="horizontal-menu">
    <nav class="navbar top-navbar col-lg-12 col-12 p-0">
      <div class="nav-top flex-grow-1">
        <div class="container d-flex flex-row h-100 align-items-center">
          <div
            class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center"
         >
            <a class="navbar-brand brand-logo disabled" 
              ><img style="height: 63px" src="../../../public/yh.png"
            /></a>
            <h2 class="navbar-h2">Pengaduan Masyarakat</h2>
          </div>
          <div
            class="navbar-menu-wrapper d-flex align-items-center justify-content-end flex-grow-1"
          >
            <ul class="navbar-nav navbar-nav-right">
              <li class="nav-item nav-profile dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  data-toggle="dropdown"
                  id="profileDropdown"
                >
                  Hallo, {{nama}}
                </a>
                <div
                  class="dropdown-menu dropdown-menu-right navbar-dropdown"
                  aria-labelledby="profileDropdown"
                >
                  <span @click="logout" class="dropdown-item">
                    <i class="mdi mdi-logout text-primary"></i>
                    Logout
                  </span>
                </div>
              </li>
            </ul>
            <button
              class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
              type="button"
              data-toggle="horizontal-menu-toggle"
            >
              <span class="mdi mdi-menu"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data : function(){
    return {
      id_user: "",
      nama: "",
      user: [],
      fields: [],
    }
  },
  // name: "navbar",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    username: function () {
      return this.$store.getters.userDetail.name;
    },
    level: function () {
      return this.$store.getters.userDetail.level;
    },
  },
  methods: {
    logout: function () {
      let conf = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Authorization"),
        },
      };
      // let form = new FormData();
      this.axios
        .post("/logout", conf)
        .then((response) => {
          if (response.data.success === false || response.data.status === 0) {
            this.$store.commit("logout");
            localStorage.removeItem("Authorization");
            this.$router.push("/login");
          }
        })
        .catch((error) => {
          // this.$store.commit('logout')
          console.log(error);
        });
    },
  },
    mounted(){
      this.nama = localStorage.getItem('nama')
    }
};
</script>