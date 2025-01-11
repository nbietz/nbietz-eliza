#!/bin/bash
if [ ! -z "$1" ]; then
    export VITE_API_BASE_URL=$1
fi
pnpm dev