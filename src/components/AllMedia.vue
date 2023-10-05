<template>
  <div class="table-responsive-sm table-responsive-md table-responsive-lg">
    <b-table :items="items">
      <!-- Custom table header using the thead-top slot -->
      <template #thead-top>
        <tr>
          <th colspan="7" class="text-center">All Media - Writer</th>
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
      <!-- render the edit button -->
      <template #cell(status)="data">
        <b-button
          variant="success"
          v-if="data.item.status !== 'Published'"
          @click="handleButtonClick(data.item)"
          >Edit</b-button
        >
        <td v-if="data.item.status === 'Published'">{{ data.item.status }}</td>
      </template>
      <!-- render the image -->
      <template #cell(image)="data">
        <img :src="data.item.image" width="120" height="110" alt="Girl" />
      </template>
    </b-table>
  </div>
</template>
<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    // Image, Title, Link, Date, Writer Name and Editor Name
    return {
      items: [
        {
          //article_id: 40,
          image:
            "https://firebasestorage.googleapis.com/v0/b/archintel-imagestorage.appspot.com/o/122.PNG?alt=media&token=2c391603-ea74-477d-ad18-4241f2cced9a",
          title: "Macdonald",
          link: "http://localhost:8081/dashboard",
          date: "04-10-2023",
          writer_name: "Writer",
          editor_name: "Editor NameAAAAAAAAAAAAAAAAAAAAAAAAA",
          status: "For Edit",
        },
        {
          //article_id: 30,
          image:
            "https://firebasestorage.googleapis.com/v0/b/archintel-imagestorage.appspot.com/o/kohler.png?alt=media&token=b1b87960-5c7a-4f8b-a5f2-6b9a98c924d5",
          title: "Macdonald",
          link: "http://localhost:8081/dashboard",
          date: "04-10-2023",
          writer_name: "Writer",
          editor_name: "Editor Name",
          status: "Published",
        },
        {
          //article_id: 20,
          image:
            "https://firebasestorage.googleapis.com/v0/b/archintel-imagestorage.appspot.com/o/1fe.png?alt=media&token=3bd389f8-a360-4425-9ae7-1bcf7521602d",
          title: "Kohler",
          link: "http://localhost:8081/dashboard",
          date: "04-10-2023",
          writer_name: "Writer",
          editor_name: "Editor Name",
          status: "Published",
        },
        {
          //article_id: 35,
          image:
            "https://firebasestorage.googleapis.com/v0/b/archintel-imagestorage.appspot.com/o/122.PNG?alt=media&token=2c391603-ea74-477d-ad18-4241f2cced9a",
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
