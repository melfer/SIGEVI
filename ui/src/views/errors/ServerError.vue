<template>
    <div class="col col-lg-6">
        <div class="card">
            <div class="card-header">
                <strong>Error de Servidor</strong>
            </div>
            <div class="card-body">
                <h5 class="card-title">500 - Error de Sistema</h5>
                <p class="card-text">Se han encontrado problemas con el servidor o con la tarea que intentaba hacer,
                    intentelo más tarde. Si el error persiste contacte al administrador del sistema para mayor información
                </p>
                <RouterLink :to="{ name: 'home' }" href="#" class="btn btn-primary">Volver al inicio</RouterLink>
            </div>
        </div>
    </div>
</template>