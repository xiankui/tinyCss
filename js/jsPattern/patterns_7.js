/**************************S.O.L.I.D五大原则之开闭原则**************************/
/*-----------------
	Software entities (classes, modules,functions, etc.) should be open for extension but
	closed for modification.		-----对扩展开放，对修改关闭。
*/


/*------------------------示例结构代码

<div class="question">
	<div class="question-label">Have you used tobacco products within the last 30 days?</div>
	<select>
		<option value="Yes">Yes</option><option value="No">No</option>
	</select>
</div>
*/

/*------------------
	问答

	问题的核心是，提问的方式一样，回答的方式却有不同（论述、选择、多选。。。）；

	抽离出回答方式以便扩展。
*/


//------------------------更加优美的方式
function questionCreator(spec, my){

	//spec   -----------   提出的问题

	//my     -----------   回答的方式

	//外部访问接口
	var that = {};

	my = my || {};
	//my.label = spec.label;

	//把不同的回答方式抽离出去
	my.renderInput = function(){
		throw 'not implemented';
	};

	//统一渲染方式，无需根据不同的回答方式作出修改
	that.render = function(target){
		var questionWrapper = document.createElement('div');
		questionWrapper.className = 'question';

		var questionLabel = document.createElement('div');
		questionLabel.className = 'question-label';
		var label = document.createTextNode(spec.label);
		questionLabel.appendChild(label);

		var answer = my.renderInput();		//不同形式的问题（选择、输入等），渲染方式不同。

		questionWrapper.appendChild(questionLabel);
		questionWrapper.appendChild(answer);
		return questionWrapper;				//questions[i].render()
		/*
			<div class="question">
				<div class="question-label"> + spec.label + </label>
				answer  	//只有这里是变数
			</div>
		*/		
	};
	return that;
};

function choiceQuestionCreator(spec){
	var my = {},
		that = questionCreator(spec,my);		//that.render()  一种继承方式吧

	//choice独特的renderInput方法
	my.renderInput = function(){
		var input = document.createElement('select');
		var len = spec.choices.length;
		for(var i=0; i<len; i+=1){
			var option = document.createElement('option');
			option.text = spec.choices[i];
			option.value = spec.choices[i];
			input.appendChild(option);
		};
		return input;
	};
	return that;								//that 还是那个 that,只是里面多了个my.renderInput
};

function inputQuestionCreator(spec){
	var my = {},
		that = questionCreator(spec,my);

	my.renderInput = function(){
		var input = document.createElement('input');
		input.type = 'text';
		return input;
	};
	return that;
};

function radioQuestionCreator(spec){
	var my = {},
		that = questionCreator(spec, my);

	my.renderInput = function(){
		var input = document.createElement('div');

		for(var i=0, len=spec.radio.length; i<len; i+=1){
			var item = document.createElement('input');
			item.type = 'radio';

			input.appendChild(item);
			input.appendChild(document.createTextNode(spec.radio[i]));
			if(i !== len-1){
				input.appendChild(document.createElement('br'));
			};
		};

		return input;
	};

	return that;
};

function checkboxQuestionCreator(spec){
	var my = {},
		that = questionCreator(spec, my);

	my.renderInput = function(){
		var input = document.createElement('div');

		for(var i=0, len=spec.choices.length; i<len; i+=1){

			var item = document.createElement('input');
			item.type = 'checkbox';

			input.appendChild(item);
			input.appendChild(document.createTextNode(spec.choices[i]));

		};

		return input;
	};

	return that;
};

var view = {
	render:function(target,questions){
		for(var i=0, len = questions.length; i<len; i+=1){
			target.appendChild(questions[i].render());
		};
	}
};

var questions = [
	choiceQuestionCreator({
		label:'Have you used tobacco products within the last 30 days?',
		choices:['Yes','No', 'e']
	}),

	inputQuestionCreator({
		label:'What medications are you currently using?'
	}),

	radioQuestionCreator({
		label : 'you are boy or girl?',
		radio : ['boy', 'girl']
	}),

	checkboxQuestionCreator({
		label : 'please choice the fruit that you like.',
		choices : ['bananer', 'apple', 'peach']
	})
];


var questionRegion = document.getElementById('questions');
view.render(questionRegion,questions);

/*
//------------------已经可一实现了，不过要增加一类问题就麻烦了，统统要改
// 问题类型
var AnswerType = {
    Choice: 0,
    Input: 1
};

// 问题实体
function question(label, answerType, choices) {
    return {
        label: label,
        answerType: answerType,
        choices: choices // 这里的choices是可选参数
    };
}

var view = (function () {
    // render一个问题
    function renderQuestion(target, question) {
        var questionWrapper = document.createElement('div');
        questionWrapper.className = 'question';

        var questionLabel = document.createElement('div');
        questionLabel.className = 'question-label';
        var label = document.createTextNode(question.label);
        questionLabel.appendChild(label);

        var answer = document.createElement('div');
        answer.className = 'question-input';

        // 根据不同的类型展示不同的代码：分别是下拉菜单和输入框两种
        if (question.answerType === AnswerType.Choice) {
            var input = document.createElement('select');
            var len = question.choices.length;
            for (var i = 0; i < len; i++) {
                var option = document.createElement('option');
                option.text = question.choices[i];
                option.value = question.choices[i];
                input.appendChild(option);
            }
        }
        else if (question.answerType === AnswerType.Input) {
            var input = document.createElement('input');
            input.type = 'text';
        }

        answer.appendChild(input);
        questionWrapper.appendChild(questionLabel);
        questionWrapper.appendChild(answer);
        target.appendChild(questionWrapper);
    }

    return {
        // 遍历所有的问题列表进行展示
        render: function (target, questions) {
            for (var i = 0; i < questions.length; i++) {
                renderQuestion(target, questions[i]);
            };
        }
    };
})();

var questions = [
                question('Have you used tobacco products within the last 30 days?', AnswerType.Choice, ['Yes', 'No']),
                question('What medications are you currently using?', AnswerType.Input)
                ];

var questionRegion = document.getElementById('questions');
view.render(questionRegion, questions);
*/

