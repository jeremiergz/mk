FROM node:12-alpine AS builder

RUN apk add --no-cache g++ gcc make python

ARG NEXT_TELEMETRY_DISABLED="1"

USER node
WORKDIR /tmp
COPY --chown=node:node . .

RUN npm install --no-audit && \
  npm run build && \
  npm prune --production && \
  mkdir package && \
  cp -r .next/ node_modules/ public/ LICENSE package.json package/

FROM node:12-alpine

ARG GIT_COMMIT
ARG VERSION

LABEL description="My magic mirror software, powered by Next." \
  git_commit="${GIT_COMMIT}" \
  maintainer="Jeremie Rodriguez <contact@jeremierodriguez.com> (https://gitlab.com/jeremiergz)" \
  version="${VERSION}"

ENV NODE_ENV="production"

USER node
WORKDIR /opt/mk
COPY --from=builder --chown=node /tmp/package/ .

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
