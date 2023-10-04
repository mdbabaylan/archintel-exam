<template>
  <div class="table-responsive-sm table-responsive-md table-responsive-lg">
    <b-table :items="items">
      <!-- Custom table header using the thead-top slot -->
      <template #thead-top>
        <tr>
          <th colspan="7" class="text-center">Writer's Dashboard - For Edit</th>
        </tr>
      </template>
      <!-- Custom column headers (optional) -->
      <template #head(image)> Image </template>
      <template #head(title)> Title </template>
      <template #head(link)> Link </template>
      <template #head(date)> Date </template>
      <template #head(writer_name)> Writer </template>
      <template #head(editor_name)> Editor </template>
      <template #head()> Editor </template>
      <template #cell(status)="data">
        <b-button
          v-if="data.item.status === 'For Edit'"
          @click="handleButtonClick(data.item)"
          >Edit</b-button
        >
        <td v-if="data.item.status !== 'For Edit'">{{ data.item.status }}</td>
      </template>
    </b-table>

    <br />
    <br />
    <br />

    <b-table :items="items">
      <!-- Custom table header using the thead-top slot -->
      <template #thead-top>
        <tr>
          <th colspan="6" class="text-center">Writer's Dashboard - Published</th>
        </tr>
      </template>
      <!-- Custom column headers (optional) -->
      <template #head(image)> Image </template>
      <template #head(title)> Title </template>
      <template #head(link)> Link </template>
      <template #head(date)> Date </template>
      <template #head(writer_name)> Writer </template>
      <template #head(editor_name)> Editor </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "WriterDashBoard",
  props: {
    msg: String,
  },
  data() {
    // Image, Title, Link, Date, Writer Name and Editor Name
    return {
      items: [
        {
          //article_id: 40,
          image: "Dickerson",
          title: "Macdonald",
          link: "http://localhost:8081/dashboard",
          date: "04-10-2023",
          writer_name: "Writer",
          editor_name: "Editor NameAAAAAAAAAAAAAAAAAAAAAAAAA",
          status: "For Edit",
        },
        {
          //article_id: 30,
          image: "Mark",
          title: "Macdonald",
          link: "http://localhost:8081/dashboard",
          date: "04-10-2023",
          writer_name: "Writer",
          editor_name: "Editor Name",
          status: "Published",
        },
        {
          //article_id: 20,
          image: "Jacked Gymbro",
          title: "Macdonald",
          link: "http://localhost:8081/dashboard",
          date: "04-10-2023",
          writer_name: "Writer",
          editor_name: "Editor Name",
          status: "Published",
        },
        {
          //article_id: 35,
          image: "Oompa Loompa",
          title: "Macdonald",
          link: "http://localhost:8081/dashboard",
          date: "04-10-2023",
          writer_name: "Writer",
          editor_name: "Editor Name",
          status: "For Edit",
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
