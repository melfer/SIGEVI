<template>
    <div class="col col-lg-6">
        <div class="card">
            <div class="card-header">
                <strong>NOT FOUND</strong>
            </div>
            <div class="card-body">
                <h5 class="card-title">404 - Recurso no Encontrado</h5>
                <p class="card-text">Beep Boop ... ¿Boop Beep?</p>
                <p class="card-text">El recurso al que intenta acceder no se encuentra disponible o fue removido. Puede
                    volver al inicio haciendo clic en el botón de abajo.</p>
                <RouterLink :to="{ name: 'home' }" class="btn btn-primary">Volver a Inicio</RouterLink>
            </div>
        </div>
    </div>
</template>