#!/bin/bash

# Wait for MySQL to be available
until nc -z -v -w30 mysql 3306; do
  echo "Waiting for MySQL to start..."
  sleep 5
done

# Wait for Kafka to be available
until nc -z -v -w30 kafka 9092; do
  echo "Waiting for Kafka to start..."
  sleep 5
done

echo "All required services are available."
