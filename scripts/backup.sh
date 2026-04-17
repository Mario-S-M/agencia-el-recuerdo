#!/bin/bash
# Script de backup automatizado de PostgreSQL
# Se ejecuta cada 24 horas (o según BACKUP_CRON en .env)

# Variables de entorno
PGHOST="${PGHOST:-postgres}"
PGPORT="${PGPORT:-5432}"
PGUSER="${PGUSER:-postgres}"
PGPASSWORD="${PGPASSWORD:-${POSTGRES_PASSWORD:-postgres}}"
PGDATABASE="${PGDATABASE:-${POSTGRES_DB:-el_recuerdo}}"
BACKUP_INTERVAL_SECONDS="${BACKUP_INTERVAL_SECONDS:-86400}"

# Rutas de volúmenes
DATA_DIR="/var/lib/postgresql/data"
BACKUP_DIR="/backups"

run_backup() {
    TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
    BACKUP_FILE="${BACKUP_DIR}/pg_dump_${PGDATABASE}_${TIMESTAMP}.sql.gz"

    mkdir -p "${BACKUP_DIR}"

    echo "=== Backup de ${PGDATABASE} iniciado ==="
    echo "Timestamp: ${TIMESTAMP}"
    echo "Archivo: ${BACKUP_FILE}"

    pg_dump -h "${PGHOST}" -p "${PGPORT}" -U "${PGUSER}" -Fp -f "${BACKUP_FILE}" \
        --format=plain \
        --verbose > /dev/null 2>&1

    if [ ! -f "${BACKUP_FILE}" ] || [ ! -s "${BACKUP_FILE}" ]; then
        echo "Intentando con formato custom..."
        BACKUP_FILE="${BACKUP_DIR}/pg_dump_${PGDATABASE}_${TIMESTAMP}.dump.gz"
        pg_dump -h "${PGHOST}" -p "${PGPORT}" -U "${PGUSER}" -Fc -f "${BACKUP_FILE}" \
            --data-only \
            --verbose > /dev/null 2>&1
    fi

    if [ -f "${BACKUP_FILE}" ] && [ -s "${BACKUP_FILE}" ]; then
        SIZE=$(du -h "${BACKUP_FILE}" | cut -f1)
        echo "=== Backup completado exitosamente ==="
        echo "Archivo: ${BACKUP_FILE}"
        echo "Tamaño: ${SIZE}"
        echo "Ubicación: ${BACKUP_DIR}"
        echo "=========================================="
        echo "$(date '+%Y-%m-%d %H:%M:%S') - Backup completado: ${BACKUP_FILE}" >> /backups/backup_log.txt
    else
        echo "=== ERROR: El backup falló ==="
    fi

    echo "=== Limpieza de backups antiguos ==="
    RETENTION_DAYS="${RETENTION_DAYS:-7}"
    find "${BACKUP_DIR}" -name "pg_dump_${PGDATABASE}_*.sql.gz" -mtime +${RETENTION_DAYS} -delete
    find "${BACKUP_DIR}" -name "pg_dump_${PGDATABASE}_*.dump.gz" -mtime +${RETENTION_DAYS} -delete
    echo "=== Backup completado ==="
}

trap 'echo "=== Backup scheduler detenido ==="; exit 0' SIGTERM SIGINT

while true; do
    run_backup
    echo "=== Próximo backup en ${BACKUP_INTERVAL_SECONDS} segundos ==="
    sleep "${BACKUP_INTERVAL_SECONDS}"
done
