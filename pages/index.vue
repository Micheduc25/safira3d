<template>
  <div class="home-main">
    <div class="upper-band relative">
      <div class="upper-band-content w-4/12">
        <img src="/images/home/safira.png" alt="safira" />
        <p class="mt-4 text-main text-4xl">
          Bienvenue sur <span class="font-bold text-4xl">Safira3D.com</span>, la
          première plateforme web de réalité virtuelle consacrée aux plus grands
          lieux du patrimoine culturel, historique et naturel du Cameroun et de
          l’Afrique !
        </p>
        <div
          class="font-bold w-full text-left text-main text-3xl font-extrabold"
        >
          Explorez – Découvrez – Apprenez !
        </div>
      </div>
    </div>
    <safira-item
      image-main="image1.png"
      image-back="image-back1.png"
      title="Le phare de Kribi"
      location="Boamanga, Kribi - Cameroun"
      categories="Catégories: Monument, Site Historique;"
      main-color="#C00000"
      secondary-color="#FF6D6D"
    >
      <template #description>
        D’une hauteur de 15 mètres, le phare de Kribi est construit en 1906 par
        les colons Allemands. Depuis 2016 se trouve, juste à côté du phare, un
        mémorial consacré à la tragique évacuation des Batanga en Février 1915
      </template>
    </safira-item>
    <safira-item
      image-main="image2.png"
      image-back="image-back2.png"
      title="Les cases obus du village Pouss"
      location="Arrondissement de Maga, Mayo-Danay - Cameroun"
      categories="Catégories: Site Culturel, Site Touristique;"
      main-color="#B63A27"
      secondary-color="#E6978A"
    >
      <template #description>
        Magnifiques éléments emblématiques de la culture Musgum, les cases obus
        sont des chefs d’œuvre présentant de beau motifs richement colorés et
        décorés.
      </template>
    </safira-item>
    <safira-item
      image-main="image3.png"
      image-back="image-back3.png"
      title="La Chefferie Bandjoun"
      location="Bandjoun - Cameroun"
      categories="Catégories: Site Culturel, Site Touristique;"
      main-color="#8A837B"
      secondary-color="#BCB8B4"
    >
      <template #description>
        Situé à une dizaine de kilomètres de la ville de Bafoussam, elle est
        l’un des éléments les plus emblématiques de la culture Bamiléké au
        Cameroun.
      </template>
    </safira-item>

    <div class="more">
      <p class="w-7/12 mx-auto text-center text-3xl">
        Notre plateforme web de réalité virtuelle évolue tous les jours.
        Retrouvez très prochainement ici d’avantages de lieux uniques et
        magnifiques à explorer
      </p>

      <div class="pagination flex justify-center mt-8 w-4/12 mx-auto">
        <span
          v-for="num in 3"
          :key="num"
          class="h-8 w-8 rounded-full bg-main mr-2 cursor-pointer"
        ></span>
      </div>
    </div>

    <div class="last-section bg-main px-3 py-6 text-white">
      <div class="text-5xl font-bold">
        Voudriez-vous que votre site apparaisse également ici?
      </div>
      <div>
        Vous êtes responsable d’un site touristique, hôtel, parc, campus
        scolaire ou universitaire, bureau… ou de tout autres lieux que vous
        voudriez faire découvrir au Monde? Vous voudriez attirer plus de
        visiteurs ou de clients vers votre activité? Alors remplissez le
        formulaire maintenant !
      </div>

      <div class="formulaire flex justify-center mt-4">
        <button class="formulaire-but text-3xl">Remplir le formulaire</button>
      </div>
    </div>
  </div>
</template>

<script>
import SafiraItem from '~/components/SafiraItem';
export default {
  components: {
    SafiraItem,
  },
};
</script>

<style lang="scss">
.home-main {
  .upper-band {
    background-image: url('/images/home/picture1.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center left;
    min-height: 45vh;
    width: 100%;

    .upper-band-content {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 15%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      @media (max-width: 1050px) {
        width: 45%;
      }
      @media (max-width: 769px) {
        width: 60%;
        right: 5%;
      }
      @media (max-width: 600px) {
        width: 80%;
        right: 5%;
        padding: 5px;
        background: rgba(0, 0, 0, 0.4);
        color: white;

        img {
          width: 200px;
        }
      }
      @media (max-width: 389px) {
        width: 97%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 5px;
        background: rgba(0, 0, 0, 0.4);
        color: white;

        img {
          width: 180px;
        }
      }

      img {
        width: 250px;
      }
    }
  }

  .more {
    min-height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .last-section {
    .formulaire-but {
      background-color: #262626;
      padding: 10px;
      transition: 0.3s;
      &:hover {
        background-color: #3b3b3b;
      }
    }
  }
}
</style>
