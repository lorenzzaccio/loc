importScripts('../../../capstech_lib_v2/js/lib/service.js');
importScripts('../../../capstech_lib_v2/js/lib/compare_array.js');
importScripts('../../../capstech_lib_v2/js/lib/libTime.js');
importScripts('../../../capstech_lib_v2/js/class/worker_class.js');
importScripts('loc_worker_class.js');

onmessage = function(e) {
  const l_w_c = new loc_worker_class({data:e.data});
}

