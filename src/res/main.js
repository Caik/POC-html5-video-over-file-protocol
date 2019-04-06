function loadPlayer() {
	const player = new Plyr('#video');
}

function loadData() {
	updateVideo('area');
}

function updateVideo(element) {
	if (element === 'area') {
		return updateArea();
	}

	if (element === 'operacao') {
		return updateOperacao();
	}

	if (element === 'assunto') {
		return updateAssunto();
	}

	if (element === 'button') {
		return updateButton();
	}

	if (element === 'video') {
		return loadVideo();
	}
}

function updateArea() {
	const empty = $('#selectAreas option').length === 0;
	const select = $('#selectAreas');

	if (empty) {
		const itens = [];
		itens.push({ value: '', text: 'Selecione uma Área' });

		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				itens.push({ value: key, text: key });
			}
		}

		addOptionsToSelect(select, itens);

		return;
	}

	updateOperacao();
}

function updateOperacao() {
	const selected = $('#selectAreas').val();
	const select = $('#selectOperacoes');
	const itens = [];

	$(select).empty();

	if (selected !== '') {
		itens.push({ value: '', text: 'Selecione uma Operação' });

		for (const key in data[selected]) {
			if (data[selected].hasOwnProperty(key)) {
				itens.push({ value: key, text: key });
			}
		}
	}

	addOptionsToSelect(select, itens);

	updateAssunto();
}

function updateAssunto() {
	const selectedArea = $('#selectAreas').val();
	const selectedOperacao = $('#selectOperacoes').val();
	const select = $('#selectAssuntos');
	const itens = [];

	$(select).empty();

	if (selectedOperacao) {
		itens.push({ value: '', text: 'Selecione um Assunto' });

		for (const key in data[selectedArea][selectedOperacao]) {
			if (data[selectedArea][selectedOperacao].hasOwnProperty(key)) {
				itens.push({ value: key, text: key });
			}
		}
	}

	addOptionsToSelect(select, itens);

	updateButton();
	loadVideo();
}

function updateButton() {
	const selectedArea = $('#selectAreas').val();
	const selectedOperacao = $('#selectOperacoes').val();
	const selectedAssunto = $('#selectAssuntos').val();

	if (selectedArea == '' || selectedOperacao == '' || selectedAssunto == '') {
		$('#playButton').attr('disabled', true);
		return;
	}

	$('#playButton').removeAttr('disabled');
}

function loadVideo() {
	const selectedArea = $('#selectAreas').val();
	const selectedOperacao = $('#selectOperacoes').val();
	const selectedAssunto = $('#selectAssuntos').val();
	const video = $('#video');

	if (selectedArea == '' || selectedOperacao == '' || selectedAssunto == '') {
		$(video)
			.removeAttr('src')
			.addClass('sr-only');

		return;
	}

	const videoUrl = data[selectedArea][selectedOperacao][selectedAssunto];
	$(video)
		.attr('src', videoUrl)
		.removeClass('sr-only');
}

function clearForm() {
	$('#selectAreas')
		.prop('selectedIndex', 0)
		.change();
}

function addOptionsToSelect(select, itens) {
	itens.forEach(function(el) {
		$(select).append($('<option>', el));
	});
}
