#!/usr/bin/env bash

# AIQA CI SCRIPTS
# https://aiqa.tech
#
# (c)2019 AIQA Technologies
#
# ver. 0.1.29


####################################################################################
####################################################################################
####################################################################################
####################################################################################
####################################################################################
####################################################################################


CI_DEFAULT_RUN=

# PARALLEL
CI_PARALLEL_LOG_FILENAME=__ci_parallel.log
CI_PARALLEL_NUMBER_OF_THREADS="-j 4"

# max: 2 failures
CI_PARALLEL_EXIT_STRATEGY="--halt soon,fail=2"

# max:3% failures
#CI_PARALLEL_EXIT_STRATEGY="--halt soon,fail=3%"


CI_SCENARIOS_LIST_FILENAME=__ci_scenarios_list.txt
CI_FINAL_TEST_RESULT_FILENAME=__ci_result.txt


CI_TEST_RUNNER_COMMAND="yarn cypress run -c baseUrl=https://geography.lh --spec {}"


CI_SCENARIOS_DIR="cypress/integration"
CI_SCENARIOS_FILEMASK="*.spec.js"


CI_BACKEND_DIR="backend-php"

CI_CUSTOM_RELOAD=1
CI_CUSTOM_BUILD=1

if [ -f "_ci_vars_personal.sh" ]; then
    source _ci_vars_personal.sh
fi


# vim:ts=4:sw=4:et:syn=sh: