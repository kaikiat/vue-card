<template>
  <div class="q-pa-md q-ml-md q-mr-md">
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md q-pa-md">
        <q-card class="video-card">
          <q-card-section class="q-pa-none">
            <!-- This section contains the video thumbnail -->
            <video
              class="video-thumbnail"
              controls
              disablePictureInPicture="true"
              controlslist="nodownload"
            >
              <source v-bind:src="url" type="video/mp4" />
            </video>

            <div class="q-ml-md q-mr-md">
              <!-- This section contains the title of the video & the dropdown navigation bar -->
              <div class="row">
                <div class="col">
                  <p class="text-subtitle1" v-bind:style="lineHeight">
                    {{ title }}
                  </p>
                </div>
                <div
                  class="col q-pr-sm q-pt-sm"
                  v-if="state == 'reviewing' || state == 'complete'"
                >
                  <div class="video-card-menu">
                    <div
                      class="fit flex non-selectable q-pa-none cursor-pointer"
                    >
                      <i class="fas fa-ellipsis-v"></i>
                    </div>
                  </div>

                  <q-menu touch-position>
                    <q-list style="min-width: 100px">
                      <q-item clickable v-close-popup>
                        <q-item-section>Delete video</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>Mark as Finished</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>Download Transcription</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>Rename To</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>Assign To</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>Human Review</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </div>
              </div>
            </div>

            <!-- This section contains the progress bar, only render if the state is reviewing or complete -->
            <div
              class="q-ml-md q-mr-md"
              v-if="state == 'reviewing' || state == 'complete'"
            >
              <q-linear-progress
                size="25px"
                :value="props.progress"
                color="accent"
              >
                <div class="absolute-full flex flex-center">
                  <q-badge
                    color="transparent"
                    text-color="dark"
                    :label="computeProgressLabel"
                  ></q-badge>
                </div>
              </q-linear-progress>
            </div>

            <!-- This section contains the last edited timestamp only render if the state is reviewing or complete -->
            <div
              class="q-ml-md q-mr-md q-pt-sm"
              v-if="state == 'reviewing' || state == 'complete'"
            >
              <small>
                Last edit :
                <span v-bind:style="styleUnderline">{{
                  computeTimeStamp.timestamp
                }}</span>
                by
                <span v-bind:style="styleUnderline">{{
                  computeTimeStamp.username
                }}</span>
              </small>
            </div>

            <!-- This section contains the last edited timestamp only render if the state is processing -->
            <div class="q-ml-md q-mr-md q-pt-sm" v-if="state == 'processing'">
              <small>
                Uploaded by :
                <span v-bind:style="styleUnderline">{{
                  computeTimeStamp.username
                }}</span>
                on
                <span v-bind:style="styleUnderline">{{
                  computeTimeStamp.timestamp
                }}</span>
              </small>
            </div>

            <!-- This section contains more details about the last action taken by the user , only render if the state is reviewing -->
            <div
              class="q-ml-md q-mr-md q-pt-sm q-pb-sm"
              v-if="state == 'reviewing'"
            >
              <small> {{ lastUpdatedDescription }} </small>
            </div>

            <!-- This section contains the state of the video -->
            <div class="q-ml-md q-mr-md q-pt-sm">
              <div class="row">
                <div class="col" v-if="state == 'processing'">
                  <i class="fas fa-check"></i>
                  <small> Transcribing by AI </small>
                </div>
                <div
                  class="col"
                  v-if="state == 'reviewing' || state == 'complete'"
                >
                  <i class="fas fa-check"></i>
                  <small> AI Transribed </small>
                </div>

                <div class="col" v-if="state == 'processing'">
                  <i class="fas fa-times"></i>
                  <small> Not Reviewed </small>
                </div>

                <div class="col" v-if="state == 'reviewing'">
                  <i class="fas fa-check"></i>
                  <small> Review by you </small>
                </div>

                <div class="col" v-if="state == 'complete'">
                  <i class="fas fa-check"></i>
                  <small> Review finished by myself </small>
                </div>
              </div>
            </div>

            <!-- This section contains the time required to transcribe the video , only render if the state is processing -->
            <div
              class="q-ml-md q-mr-md q-pt-sm q-pb-sm"
              v-if="state == 'processing'"
            >
              <small>
                Estimated time required for AI transribing :
                {{ estimatedDuration }} h
              </small>
            </div>

            <div
              class="q-ml-md q-mr-md q-pt-md q-pb-sm"
              v-bind:style="styleCenter"
              v-if="state == 'complete'"
            >
              <q-btn
                outline
                rounded
                color="primary"
                label="Download Subtitled Video"
                class="custom-button"
              >
                <i class="fas fa-download q-ml-md"></i>
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang = "ts">
import { defineComponent, computed } from '@vue/composition-api';
import convertToTimeStamp from './utils';
import lastUpdatedObject from './models';
import './Card.sass';

export default defineComponent({
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    lastUpdated: {
      type: Date,
      required: true,
    },
    lastUpdatedDescription: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    estimatedDuration: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const computeProgressLabel = computed((): string => {
      const label = (props.progress * 100).toFixed(2) + '%';
      return label;
    });

    const computeTimeStamp = computed(
      (): lastUpdatedObject => {
        const timeStampObj = convertToTimeStamp(
          props.lastUpdated,
          props.username
        );
        return timeStampObj;
      }
    );

    return {
      props,
      computeProgressLabel,
      computeTimeStamp,
      styleLinearProgress: {
        color: 'white',
      },
      styleUnderline: {
        textDecoration: 'underline',
      },
      styleCenter: {
        textAlign: 'center',
      },
      lineHeight: {
        lineHeight: '1rem',
      },
    };
  },
});
</script>

<style>
</style>