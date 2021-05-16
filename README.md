# Quasar App (card)

Card component

## Usage

```
<template>
  <div>
    <!-- Card component -->
    <Card
      v-bind:title="video.title"
      v-bind:url="video.url"
      v-bind:progress="video.progress"
      v-bind:state="video.state"
      v-bind:lastUpdated="video.lastUpdated"
      v-bind:lastUpdatedDescription="video.lastUpdatedDescription"
      v-bind:username="video.username"
      v-bind:estimatedDuration="video.estimatedDuration"
    />
  </div>
</template>


<script lang = "ts">
import { defineComponent } from '@vue/composition-api';
import Card from '../components/Card.vue';

export default defineComponent({
  name: 'Homepage',
  components: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    Card,
  },
  setup() {
    interface videoObject {
      title: string;
      url: string;
      progress: number;
      state: 'processing' | 'reviewing' | 'complete';
      lastUpdated: Date;
      lastUpdatedDescription: string;
      username: string;
      estimatedDuration: string;
    }
    let video: videoObject = {
      title: 'Presentation Demo 2',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      progress: 0.42,
      state: 'processing',
      lastUpdated: new Date(),
      lastUpdatedDescription:
        'Some description for video, lorem ipsum dolor sit amet , consectetur.',
      username: 'User name 123',
      estimatedDuration: '2',
    };

    return {
      video,
    };
  },
});
</script>

```

## Source code
Source code can be found `./src/components/card/Card.vue`

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://v1.quasar.dev/quasar-cli/quasar-conf-js).
