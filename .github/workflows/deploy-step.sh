#!/bin/bash
set -euo pipefail

SERVER="$1"
REMOTE_ROOT="~/caddy/www/wiki"
RELEASE="$(date +%Y-%m-%d-%H-%M-%S)"
RELEASE_DIRECTORY="releases/$RELEASE"
REMOTE_RELEASE_PATH="$REMOTE_ROOT/$RELEASE_DIRECTORY"

RSYNC_OPTS=(
  -v                               # verbose, lists all files being transferred
  --compress                       # compress file data during the transfer
  --recursive                      # recurse into directories
  --links                          # copy symlinks as symlinks
  --times                          # preserve modification times
  --info=stats2                    # give some file transfer stats at the end
  --chmod="Du=rwx,Dgo=,Fu=rw,Fgo=" # set permissions for dirs and files
)

echo "Uploading release $RELEASE to $SERVER:$REMOTE_RELEASE_PATH"

echo "::group::rsync"

rsync "${RSYNC_OPTS[@]}" ./build/ "$SERVER:$REMOTE_RELEASE_PATH"

echo "::endgroup::"

echo "Setting release $RELEASE as current on $SERVER"

ssh $SERVER "
  cd $REMOTE_ROOT && \
  ln -sfn $RELEASE_DIRECTORY .current-$RELEASE && \
  mv -Tf .current-$RELEASE current
"

echo "Cleaning up old releases on $SERVER"
KEEP=3

ssh $SERVER "
    cd $REMOTE_ROOT/releases && \
    ls -1t | tail -n +$((KEEP+1)) | xargs -r rm -rf --
"
